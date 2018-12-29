import { LookArticleAssociation } from '../enums/look-article-association.enum';

export class Article {

    id: number

    shoppingSiteName: string;
	
	shoppingUrl: string;
	
    imgUrl: string;

    imgString: string | ArrayBuffer ;
    
    brand: string;

    description: string;
	
    price: number;
    
    lookArticleAssociation: LookArticleAssociation;

    rank: number;
}
