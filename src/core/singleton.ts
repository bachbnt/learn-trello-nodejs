class Singleton {
  private static instance: any;
  constructor() {}
  static getInstance(Class = Singleton) {
    if (!Class.instance) {
      Class.instance = new Class();
    }
    return Class.instance;
  }
}

export default Singleton;
