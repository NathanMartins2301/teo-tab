import migrationRunner from 'node-pg-migrate'
import { join } from 'node:path'
import database from 'infra/database'
import { error } from 'node:console'

export default async function migrations(req, res) {
  const allowedMethods = ['GET', 'POST']

  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      error: `Method "${req.method}" now allowed`,
    })
  }

  let dbClient

  try {
    dbClient = await database.getNewClient()
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    }

    if (req.method === 'GET') {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions)
      res.status(200).json(pendingMigrations)
    }

    if (req.method === 'POST') {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      })

      if (migratedMigrations.length > 0) {
        res.status(201).json(migratedMigrations)
      }
      res.status(200).json(migratedMigrations)
    }
  } catch (error) {
    console.error(error)
  } finally {
    await dbClient.end()
  }
}
