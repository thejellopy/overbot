# Overbot

---

Discord Bot สารพัดประโยชน์สำหรับเกม Black Desert Online สร้างขึ้นโดยกิลด์ Overslept เพื่อกิลด์ Overslept

# Installation

---

1. Clone Source Code
    ```
    git clone https://github.com/thejellopy/overbot.git
    ```

2. Install NPM Packages
    ```
    npm install
    ```

3. สร้าง Discord App และ สร้าง Discord Bot เพื่อเปิดใช้งาน `BOT_TOKEN` ([อ่านเพิ่มเติม](https://discordapp.com/developers/docs/intro))
4. เปิด Discord Developer Mode เพื่อหา `CHANNEL_ID` ([อ่านเพิ่มเติม](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-))
5. สร้าง `.env` โดยสามารถดูเนื้อหาได้จากไฟล์ `.env.example`
6. อัพเดทค่าที่อยู่ใน `.env`
7. เริ่มต้นใช้งานบอท
    ```
    node index.js
    ```
