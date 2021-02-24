const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'totrip.xin',
    port: '3306',
    user: 'root',
    password: 'cg@_@cg',
    database: 'ry-vue'
})

connection.connect();

function querySql(sql, sqlParams) {
    return new Promise((resolve, reject) => {
        connection.query(sql, sqlParams, (error, results, fields) => {
            resolve(results, fields);
            reject(error);
        })
    })
}

function endConnection() {
    connection.end()
}

const queryCategory = () => querySql('SELECT * FROM blog_category')
const addCategory = name => querySql('INSERT INTO `blog_category`(`name`) VALUES (?)', name)
const queryContentByTitle = (title) => querySql('SELECT * FROM blog_content WHERE title=?', title)
const addContent = ({title, add_time, views, description, content, category_id, user_id}) => querySql('INSERT INTO `blog_content`(`title`, `add_time`, `views`, `description`, `content`, `category_id`, `user_id`) VALUES (?,?,?,?,?,?,?);', [
    title, add_time, views, description, content, category_id, user_id
])

module.exports = {
    endConnection,
    queryCategory,
    addCategory,
    addContent,
    queryContentByTitle
}


