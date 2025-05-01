interface IOptions {
    page?:number,
    limite?:number,
    sortBy?:string,
    sortOrder?:string
}

interface IOptionsResult {
    page:number,
    limite:number,
    skip:number,
    sortBy:string,
    sortOrder:string
}

const calculatePagination = (options:IOptions):IOptionsResult => {
    const page:number = Number(options.page) || 1
    const limite:number = Number(options.limite) || 10

    const skip = (Number(page - 1) * limite);
    const sortBy  = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';

    return {skip,sortBy,page,limite,sortOrder}
}


export const paginationHelper = {
    calculatePagination
}