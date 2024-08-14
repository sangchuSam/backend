import mariadb from "mariadb"
import dotenv from "dotenv";
dotenv.config();

// db connection
const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: 5
  });

  // arrow function
  const getAllUsers = async() => {
    let conn; // 연결설정 변수(연결 POOL)
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");
        return rows;
    } catch(err) {
        console.log(err);
        return conn.release()

    } finally {
        if(conn) conn.end();
    }
  }

  
  const getOneUser = async(userId) => {
    let conn; // 연결설정 변수(연결 POOL)
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users WHERE id=?", [userId]);
        return rows;
    } catch(err) {
        console.log(err);
        return conn.release()

    } finally {
        if(conn) conn.end();
    }
  }


  
  const addUser = async(id, pwd, name, nick, email, hint) => {
    let conn; // 연결설정 변수(연결 POOL)
    //const saltRounds = 10;
    //const hashedPwd = await bcrypt.hash(pwd, saltRounds); // 해싱된 비밀번호 생성
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("INSERT INTO users(id, pwd, name, nickname, email, pwd_hint) VALUES (?,?,?,?,?,?)", [id, pwd, name, nick, email, hint]);
        return rows;
    } catch(err) {
        console.log(err);
        return conn.release()

    } finally {
        if(conn) conn.end(); // pool 자체 종료 --> 시간, 네트워크 --> 개발비용 증가 
        // .end() : 연결 중단 , .release();
    }
  }

  // 객체(Object): 문자열, 숫자, 논리, 함수, 클래스, 심볼...
  // 자바스크립트 자료형을 담을 수 있다.
  const userModel = {
    getAllUsers,
    getOneUser,
    addUser
  }

  export default userModel;
  