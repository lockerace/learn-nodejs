// db connection
const knex = require('knex')({
  client: 'mssql',
  connection: {
    server : '127.0.0.1',
    user : 'mssql_user',
    password : 'mssql_password',
    database : 'mssql_database',
    options: {
      port: 14831
    }
  }
});

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

var router = new Router();

router.get('/', async(ctx) => {
  let page = '<html><body>';
  page += '<div><h1>Learn Node.js</h1></div>';
  page += '<div><a href="/insert">Insert</a></div>';
  page += '<div><a href="/update">Update</a></div>';
  page += '<div><a href="/delete">Delete</a></div>';
  page += '</body></html>';
  ctx.body = page;
});

router.get('/insert', async(ctx) => {
  try {
    const trx = await knex.transaction();
    try {
      const insertResult = await knex('table_name')
        .transacting(trx)
        .insert({field: 'value'});
      trx.commit();
      ctx.body = '<html><body><div><h1>Insert success</h1></div><a href="/">Back</a></body></html>';
    } catch (error) {
      console.error(error);
      trx.rollback();
      ctx.body = '<html><body><div><h1>Insert failed</h1></div><a href="/">Back</a></body></html>';
    }
  } catch (connectionError) {
    console.error(connectionError);
    ctx.body = '<html><body><div><h1>Connection Failed</h1></div><a href="/">Back</a></body></html>';
  }
})

router.get('/update', async(ctx) => {
  try {
    const trx = await knex.transaction();
    try {
      const updateResult = await knex('table_name')
        .transacting(trx)
        .where('id', 1)
        .update({
          field: 'updatedValue',
        });
      trx.commit();
      ctx.body = '<html><body><div><h1>Update success</h1></div><a href="/">Back</a></body></html>';
    } catch (error) {
      console.error(error);
      trx.rollback();
      ctx.body = '<html><body><div><h1>Update failed</h1></div><a href="/">Back</a></body></html>';
    }
  } catch (connectionError) {
    console.error(connectionError);
    ctx.body = '<html><body><div><h1>Connection Failed</h1></div><a href="/">Back</a></body></html>';
  }
})

router.get('/delete', async(ctx) => {
  try {
    const trx = await knex.transaction();
    try {
      const deleteResult = await knex('table_name')
        .where('id', 1)
        .del();
      trx.commit();
      ctx.body = '<html><body><div><h1>Delete success</h1></div><a href="/">Back</a></body></html>';
    } catch (error) {
      console.error(error);
      trx.rollback();
      ctx.body = '<html><body><div><h1>Delete failed</h1></div><a href="/">Back</a></body></html>';
    }
  } catch (connectionError) {
    console.error(connectionError);
    ctx.body = '<html><body><div><h1>Connection Failed</h1></div><a href="/">Back</a></body></html>';
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
