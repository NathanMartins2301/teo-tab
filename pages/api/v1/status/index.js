import database from 'infra/database'

export default async function status(req, res) {
  const updatedAt = new Date().toISOString()
  const databaseVersionResult = await database.query('SHOW server_version;')
  const dataBaseVersionValue = databaseVersionResult.rows[0].server_version

  const dataBaseMaxConnectionsResult = await database.query(
    'SHOW max_connections;'
  )
  const dataBaseMaxConnectionsValue =
    dataBaseMaxConnectionsResult.rows[0].max_connections

  const databaseName = process.env.POSTGRES_DB
  const databaseOpenedConnectionsResult = await database.query({
    text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  })

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dataBaseVersionValue,
        max_connections: parseInt(dataBaseMaxConnectionsValue),
        opened_connections: 1,
      },
    },
  })
}
