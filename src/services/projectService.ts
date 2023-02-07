import Singleton from '@core/singleton';
import { Project, ProjectDocument, ProjectModel } from '@models/project';

class ProjectService extends Singleton {
  static getInstance(): ProjectService {
    return super.getInstance(ProjectService);
  }

  async readProjects(): Promise<ProjectDocument[]> {
    return await ProjectModel.find();
  }

  async createProject(project: Project): Promise<ProjectDocument> {
    return await new ProjectModel(project).save();
  }

  async readProject(condition: Object): Promise<ProjectDocument | null> {
    return await ProjectModel.findOne(condition);
  }

  async updateProject(
    condition: Object,
    value: Object
  ): Promise<ProjectDocument | null> {
    return await ProjectModel.findOneAndUpdate(condition, value, { new: true });
  }

  async deleteProject(condition: Object): Promise<any> {
    return await ProjectModel.deleteOne(condition);
  }
}

const projectService = ProjectService.getInstance();

export default projectService;
