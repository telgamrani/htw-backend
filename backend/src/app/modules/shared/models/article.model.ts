import { LookArticleAssociationType } from '../enums/look-article-association-type.enum';

export class Article {

    id: number

    shoppingSiteName: string;
	
	shoppingUrl: string;
    
    indexImagePrincipal: number;

    // TODO : A supprimer
    imgString: string | ArrayBuffer ;
    
    brand: string;

    description: string;
	
    price: number;
    
    lookArticleAssociationType: LookArticleAssociationType;

    rank: number;

    sizes: Array<string>;

    color: string;

    images: Array<string>;

    categories: Array<string>;

}
