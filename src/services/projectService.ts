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
    const { name, key } = project;
    return await new ProjectModel({ name, key }).save();
  }

  async readProject(condition: Object): Promise<ProjectDocument | null> {
    return await ProjectModel.findOne(condition);
  }
}

const projectService = ProjectService.getInstance();

export default projectService;
