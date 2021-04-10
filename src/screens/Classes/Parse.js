import { Info } from './data'

export class Parse {

    constructor(filePath) {
        this.File = filePath
        this.DescStartIndex = ''
    }

    // readTextFile = () => {
    //     return Info
    // }

    getInfo = (n) => {
        let Items = this.readItems()
        let Jsn = this.getJSON(Items[n])
        return Jsn



    }


    readTextFile = () => {
        var Total = []
        let Items = this.readItems()
        Items.forEach((Item) => {
            let Jsn = this.getJSON(Item)
            Total.push(Jsn)
        })
        return Total
    }

    getJSON = (Item) => {
        let KeyWords = this.getKeyWords(Item)
        let Syntax = this.readSyntax(Item)
        let Restrict = this.readRestriction(Item)
        let Description = this.readDescription(Item)
        let SeeAlso = this.getSeeAlso(Item)

        let JSN = ({
            KeyWords: KeyWords,
            RestrictCode: Restrict,
            Syntax: Syntax,
            Description: Description,
            SeeAlso: SeeAlso
        })

        return JSN

    }

    getKeyWords = (item) => {
        let Words = item.substring(item.indexOf('-') + 3, item.indexOf('~'))
        let WordsArray = Words.split(" ")
        return WordsArray
    }

    getSeeAlso = (item) => {
        let SA = []
        if (item.includes('See also:')) {
            return this.processSeeAlso(item, 'See also:')
        } else if (item.includes('see:')) {
            return this.processSeeAlso(item)
        }

        else {
            return "undefined"
        }
    }

    processSeeAlso = (item, Starter) => {
        let Start = item.lastIndexOf(Starter) + 9
        let flast = item.substring(Start, item.length)
        let Stop = flast.indexOf('\n')
        let snapSA = flast.substring(0, Stop)
        let SA = snapSA.split(',')
        return SA
    }

    readDescription = (item) => {
        let PreDesc = item.substring(this.DescStartIndex, item.length - 1);
        var start = PreDesc.indexOf('\n')
        if (PreDesc.includes('See also:')) var Stop = PreDesc.indexOf('See also:')
        if (PreDesc.includes('see:')) var Stop = PreDesc.indexOf('see:')
        if (!PreDesc.includes('See also:') && !PreDesc.includes('see:')) var Stop = PreDesc.length - 1
        let Description = PreDesc.substring(start, Stop)
        Description = this.refineDescription(Description)
        return Description
    }

    refineDescription = (Description) => {
        while (Description.charAt(0) === '\n' || Description.charAt(0) === ' ') {
            Description = Description.substring(1);
        }
        return Description
    }


    readSyntax = (item) => {

        let indexes = []

        try { indexes = [...item.matchAll(new RegExp('Syntax:', 'gi'))].map(a => a.index); } catch (ex) { }

        if (indexes.length) {

            return this.readSyntaxByTags(item, indexes)

        }
    }

    readSyntaxByTags = (item, indexes) => {
        let Syntaxes = [], neoIndex = indexes.map((i) => i + 7)
        this.DescStartIndex = item.lastIndexOf('>')
        Syntaxes = this.getSyntaxSimple(item)
        return Syntaxes
    }

    getSyntaxSimple = (item) => {
        let Parts = item.split('\n'), Synx = []
        let Last = item.lastIndexOf('Syntax:')
        let MeanStr = item.substring(0, Last)
        let Stop = MeanStr.split('\n').length;

        for (let i = 4; i <= Stop; i++) {
            if (this.Even(i)) {
                let sxVal = Parts[i].split(':')[1]
                if (sxVal !== undefined) {
                    sxVal = sxVal.substring(0, 1) == " " ? sxVal.substring(1, sxVal.length) : sxVal
                    Synx.push(sxVal)
                }
            }
        }
        this.DescStartIndex = item.lastIndexOf(Parts[Stop - 1])
        //  alert(item.substring(Start , item.length - 1))
        return Synx
    }

    Even = (x) => { return x % 2 == 0 }


    readRestriction = (Item) => {
        let Index = Item.substring(0, 7).indexOf('-')
        let Restrict = Item.substr(Index + 1, 1)
        return Restrict

    }

    readItems = () => {
        let Sections = Info.split('#')
        return Sections;
    }

}





    // readSyntaxBySpaces = (item) => {
    //     alert("spc")
    //     let StrCount, Syntaxes = [], Particles = []
    //     Particles = item.split(" ")
    //     for (let i = 0; i <= Particles.length - 1; i++) {
    //         StrCount += Particles[i].length
    //         if (Particles[i].includes('Syntax:')) {
    //             this.DescStartIndex = StrCount
    //             let SyntaxnValue = Particles[i + 1]
    //             let target = SyntaxnValue.substr(0, SyntaxnValue.length - 8)
    //             Syntaxes.push(target)
    //         }
    //     }
    //     return Syntaxes
    // }



    // getSyntaxValue = (item, SxValStart) => {
    //     let Syx = []

    //     SxValStart.forEach((index) => {
    //         console.log(index)
    //         // get Syntax Value : next word
    //         //  let Stop = item.indexOf(' ', index + 1)                     
    //         //  let Word = item.slice(index + 1, Stop)
    //         //  Word = Word.includes('\n') ? Word.split('\n')[0] : Word
    //         //  alert(Word)

    //         let prt = item.split('\n')
    //         alert(prt[8])

    //         // check if has tags ? push ? 

    //         // check if has next tags ? push ?

    //         // has No Tags ? Push Word Only


    //         // Syx.push(resp)
    //     })

    //     return Syx
    // }
