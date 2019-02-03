import { RobotScrapingSelector } from './robot-scraping-selector.model';
import { Category } from './category.model';

export class RobotScrapingUrl {
    
    url: string;
    selectors: Array<RobotScrapingSelector>;
    categories: Array<Category>;
}
