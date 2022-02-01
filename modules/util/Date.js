class DateUtil{
    constructor() {

        this.sec = 1000
        this.min = 60 * this.sec
        this.hours = 60 * this.min
        this.day = 24 * this.hours
        this.month = 30 * this.day
        this.year = 12 * this.month

        this.checkList = [
            {base:this.year, text:'년'},
            {base:this.month, text:'개월'},
            {base:this.day, text:'일'},
            {base:this.hours, text:'시간'},
            {base:this.min, text:'분'},
            {base:this.sec, text:'초'},
        ]
        
    }
    getTimeToApxText(to, from){
        
        let val = (from?from:Date.now()) - to
        
        for(let check of this.checkList){
            
            if(val > check.base){
                return this.division(val, check.base) + check.text
            }

        }

    }
    division(a, b){
        return Number(a / b).toFixed(0)
    }
}

export default new DateUtil()