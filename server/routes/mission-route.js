const router = require("express").Router();
const conn = require("../db");

router.get("/", (req, res) => {
  res.send("mission-route測試成功");
});

// 共用的 SQL 子查詢，找出每個任務的最小 image_id
const commonSubquery = `
  SELECT mission_id, MIN(image_id) AS min_image_id
  FROM image_mission
  GROUP BY mission_id
`;

// 共用的 SQL 查詢模板
const commonQueryTemplate = `
  SELECT md.*, im.file_path AS file_path
  FROM mission_detail AS md
  JOIN (${commonSubquery}) AS min_ids ON md.mission_id = min_ids.mission_id
  JOIN image_mission AS im ON min_ids.mission_id = im.mission_id AND min_ids.min_image_id = im.image_id
`;

// 排序
// router.get("/all-missions", (req, res) => {
//   const sortOrder = req.query.sortOrder; 
//   let orderBy = null;

//   if (req.query.sortBy === "post_date") {
//     orderBy = "md.post_date";
//   } else if (req.query.sortBy === "price") {
//     orderBy = "md.price";
//   }

//   if (orderBy) {
//     // 只有在提供有效的 orderBy 時才應用排序
//     conn.execute(
//       `${commonQueryTemplate}
//       ORDER BY ${orderBy} ${sortOrder}
//       `,
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         res.send({ status: 200, data: result });
//       }
//     );
//   } else {
//     // 如果 orderBy 仍然為 null，表示沒有提供有效的排序方式，不進行排序
//     conn.execute(
//       `${commonQueryTemplate}`,
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         res.send({ status: 200, data: result });
//       }
//     );
//   }
// });

// 我現在要在排序裡面新增篩選
router.get("/all-missions", (req, res) => {
  let sortOrder = req.query.sortOrder;
  let orderBy = null;

  // 獲取任務類型篩選條件
  let filteredMissionType = req.query.missionType; 
  let missionTypeFilter; // 先聲明變量（很重要！否則當missionTypeFilter=null會沒資料 會無法清除篩選）


  // 獲取城市和地區篩選條件
  let cityFilter = req.query.missionCity;
  let areaFilter = req.query.missionArea;

  // 獲取排序條件
  if (req.query.sortBy === "post_date") {
    orderBy = "md.post_date";
  } else if (req.query.sortBy === "price") {
    orderBy = "md.price";
  }

  // 獲取篩選條件
  if (filteredMissionType === "feed") {
    missionTypeFilter = 1;
  } else if (filteredMissionType === "house") {
    missionTypeFilter = 2;
  }else if (filteredMissionType === "beauty") {
    missionTypeFilter = 3;
  }else if (filteredMissionType === "training") {
    missionTypeFilter = 4;
  }else if (filteredMissionType === "medical") {
    missionTypeFilter = 5;
  }
  
  let query = commonQueryTemplate;

  // 如果提供了任務類型篩選條件，將其包含在查詢中
  // if (missionTypeFilter) {
  //   query += ` WHERE md.mission_type = ${missionTypeFilter}`;
  // }

  // WHERE 子句
  let whereClause = [];

  // 如果提供了任務類型篩選條件，將其包含在 WHERE 子句中
  if (missionTypeFilter) {
    whereClause.push(`md.mission_type = ${missionTypeFilter}`);
  }

  // 如果提供了城市篩選條件，將其包含在 WHERE 子句中
  if (cityFilter) {
    whereClause.push(`md.city = '${cityFilter}'`);
  }

  // 如果提供了地區篩選條件，將其包含在 WHERE 子句中
  if (areaFilter) {
    whereClause.push(`md.area = '${areaFilter}'`);
  }

  // 如果有 WHERE 子句，將其加入查詢
  if (whereClause.length > 0) {
    query += ` WHERE ${whereClause.join(' AND ')}`;
  }

  if (orderBy) {
    // 只有在提供有效的 orderBy 時才應用排序
    query += `
      ORDER BY ${orderBy} ${sortOrder}
    `;
  }

  conn.execute(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send({ status: 200, data: result });
  });
});



router.get("/latest-missions", (req, res) => {
  conn.execute(
    `${commonQueryTemplate}
    ORDER BY md.post_date DESC
    LIMIT 8;`,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({ status: 200, data: result });
    }
  );
});

// 可以成功併成一筆資料：
router.get("/mission-details/:mission_id", (req, res) => {
  const mission_id = req.params.mission_id; // 從路由參數中獲取 mission_id
  conn.execute(
    `
    SELECT md.*, u.*, GROUP_CONCAT(DISTINCT im.file_path ORDER BY im.image_id) AS file_paths
    FROM mission_detail AS md 
    JOIN users AS u ON md.post_user_id = u.user_id 
    JOIN image_mission AS im ON md.mission_id = im.mission_id
    WHERE md.mission_id = ?
    GROUP BY md.mission_id;
    `,
    [mission_id],  // 使用 mission_id 進行查詢
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({ status: 200, data: result });
    }
  );
});

// 可以讓照片正常顯示
router.get("/mission-details-img/:mission_id", (req, res) => {
  const mission_id = req.params.mission_id; // 從路由參數中獲取 mission_id
  conn.execute(
    `SELECT md.*, im.file_path AS file_path
    FROM mission_detail AS md
    JOIN image_mission AS im ON md.mission_id = im.mission_id
    WHERE md.mission_id = ?
    ;`
    , [mission_id],  // 使用 mission_id 進行查詢
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.send({ status: 200, data: result });
    }
  );
})

// 按照刊登時間排序
// router.get("/mission-sorted/:sortOrder", (req, res) => {
//   const sortOrder = req.params.sortOrder.toLowerCase(); // 獲取排序順序參數（asc或desc）
//   if (sortOrder !== "asc" && sortOrder !== "desc") {
//     res.status(400).send({ status: 400, message: "Invalid sortOrder parameter" });
//     return;
//   }

//   const orderBy = sortOrder === "asc" ? "ASC" : "DESC";

//   conn.execute(
//     `${commonQueryTemplate}
//     ORDER BY md.post_date ${orderBy}
//     `,
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       res.send({ status: 200, data: result });
//     }
//   );
// });




module.exports = router;