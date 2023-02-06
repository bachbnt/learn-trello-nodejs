import Singleton from '@core/singleton';

class IssueController extends Singleton {
  static getInstance(): IssueController {
    return super.getInstance(IssueController);
  }

  async getIssues(): Promise<any> {}

  async postIssue(): Promise<any> {}
}

const issueController = IssueController.getInstance();
export default issueController;
