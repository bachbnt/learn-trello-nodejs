import Config from '@core/config';
import Singleton from '@core/singleton';
import mongoose, { ConnectOptions } from 'mongoose';

const options: ConnectOptions = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class Database extends Singleton {
  static getInstance(): Database {
    return super.getInstance(Database);
  }

  async connect(): Promise<void> {
    mongoose.connect(Config.DATABASE_URL, options);
    const database = mongoose.connection;
    database.on(
      'error',
      console.error.bind(console, 'Database connection is failed:')
    );
    database.once(
      'open',
      console.log.bind(console, 'Database connection is success')
    );
  }
}

const database = Database.getInstance();

export default database;
