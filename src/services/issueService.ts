import Singleton from '@core/singleton';
import { Issue, IssueDocument, IssueModel } from '@models/issue';

class IssueService extends Singleton {
  static getInstance(): IssueService {
    return super.getInstance(IssueService);
  }

  async readIssues(): Promise<IssueDocument[]> {
    return await IssueModel.find();
  }

  async createIssue(issue: Issue): Promise<IssueDocument> {
    const {
      name,
      summary,
      description,
      type,
      priority,
      project,
      assignee,
      reporter,
    } = issue;
    return await new IssueModel({
      name,
      summary,
      description,
      type,
      priority,
      project,
      assignee,
      reporter,
    }).save();
  }
}

const issueService = IssueService.getInstance();

export default issueService;
