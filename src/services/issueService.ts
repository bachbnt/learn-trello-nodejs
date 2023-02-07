import Singleton from '@core/singleton';
import { Issue, IssueDocument, IssueModel } from '@models/issue';

class IssueService extends Singleton {
  static getInstance(): IssueService {
    return super.getInstance(IssueService);
  }

  async readIssues(projectId: string): Promise<IssueDocument[]> {
    return await IssueModel.find({ project: projectId });
  }

  async createIssue(issue: Issue): Promise<IssueDocument> {
    return await new IssueModel(issue).save();
  }

  async readIssue(condition: Object): Promise<IssueDocument | null> {
    return await IssueModel.findOne(condition);
  }

  async updateIssue(
    condition: Object,
    value: Object
  ): Promise<IssueDocument | null> {
    return await IssueModel.findOneAndUpdate(condition, value, { new: true });
  }

  async deleteIssue(condition: Object): Promise<any> {
    return await IssueModel.deleteOne(condition);
  }

  async countIssues(projectId: string): Promise<number> {
    return await IssueModel.count({ project: projectId });
  }
}

const issueService = IssueService.getInstance();

export default issueService;
