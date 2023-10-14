
const dotenv = require('dotenv');
dotenv.config();

const router = require("express").Router();
const transporter = require('../config/mail.js');
const {createOtp, updatePassword} = require('../models/otp.js')


const mailText = (otpToken)=> `親愛的網站會員 您好，
通知重設密碼所需要的驗証碼，
請輸入以下的6位數字，重設密碼頁面的"電子郵件驗証碼"欄位中。
請注意驗証碼將於寄送後30分鐘後到期，如有任何問題請洽網站客服人員:

${otpToken}

小貓兩三隻團隊 敬上`

router.post('/otp', async(req, res, next)=>{
    const {email} = req.body;
    if(!email){
        return res.json({message:'輸入email錯誤', code: '400'})
    }
    // 建立otp資料表記錄，成功回傳otp記錄物件，失敗為空物件{}
    const otp = await createOtp(email);
    if(!otp.token){
        return res.json({message:'建立otp記錄失敗 沒token', code: '400'})
    }

    const mailOptions ={
        from: `"Irene Smith" <${process.env.SMTP_TO_EMAIL}>`,
        to: email,
        subject: '重設密碼的電子郵件驗証碼',
        text: mailText(otp.token),
    }
    transporter.transporter.sendMail(mailOptions, (err, response) =>{
        if(err){
            return res.status(400).json({message: '寄送失敗', detail: err});
        }else{
            // 成功回覆json
            return res.json({message: '寄送成功', code: '200'});
        }
    })
})

module.exports = router;