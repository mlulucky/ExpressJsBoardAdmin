class PageVo{
    #totalRow; //조회된 게시글의 전체수
    #totalPage;//총 페이지 수 [1,2,3]
    #page;//화면에 출력될 현재 페이지
    #next;
    #prev;
    #isNext;
    #isPrev;
    #rowLength=5; //화면에 출력될 row 수
    #offset; // LIMIT offset,rowLength;
    #query; //page 를 제외한 쿼리
    //{status:"PUBLIC",order:"b_id",page:3} => status=PUBLIC&order=b_id&
    constructor(page,totalRow,reqQuery,rowLength=5) {
        this.#page=page;
        this.#totalRow=totalRow;
        this.#rowLength=rowLength;
        this.#offset=(page-1)*rowLength;
        this.#totalPage=Math.ceil(totalRow/rowLength);  // 16/5=> 3.2
        this.#next=page+1;
        this.#prev=page-1;
        this.#isNext=(this.#next <= this.#totalPage);
        this.#isPrev=(this.#prev >= 1);
    }
    get offset() {
        return this.#offset;
    }

    set offset(value) {
        this.#offset = value;
    }

    get totalPage() {
        return this.#totalPage;
    }

    set totalPage(value) {
        this.#totalPage = value;
    }

    get next() {
        return this.#next;
    }

    set next(value) {
        this.#next = value;
    }

    get prev() {
        return this.#prev;
    }

    set prev(value) {
        this.#prev = value;
    }

    get isNext() {
        return this.#isNext;
    }

    set isNext(value) {
        this.#isNext = value;
    }

    get isPrev() {
        return this.#isPrev;
    }

    set isPrev(value) {
        this.#isPrev = value;
    }
    get rowLength(){
        return this.#rowLength;
    }
    get page(){
        return this.#page;
    }
    get totalRow(){
        return this.#totalRow;
    }

}
module.exports=PageVo;