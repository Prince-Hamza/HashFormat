import { Info } from './data'

export class Parse {

    constructor(filePath) {
        this.File = filePath
        this.DescStartIndex = ''
    }

    // readTextFile = () => {
    //     return Info
    // }

    ProtoTypes = () => {
        Object.prototype.Stringify = () => {
            return JSON.stringify(this)
        }
        Object.prototype.log = () => {
            return console.log(this)
        }
        String.prototype.log = () => {
            return console.log(this)
        }


    }

    getInfo = (n) => {
        let Items = this.readItems()
        // let Jsn = this.getJSON(Items[n])
        // return Jsn.KeyWords

        // this.getClass(Items[n])
        // return k
    }



    getInfoAll = () => {
        var Total = []
        let Items = this.readItems()
        Items.forEach((Item) => {
              let JSN = this.getJSON(Item)
              Total.push(JSN)
           // this.getKeyWords(Item)
        })
        return Total
    }

    getJSON = (Item) => {
        let Class = this.getClass(Item)
        let KeyWords = this.getKeyWords(Item)
        let Syntax = this.readSyntax(Item)
        let Restrict = this.readRestriction(Item)
        let Description = this.readDescription(Item)
        let SeeAlso = this.getSeeAlso(Item)

        let JSN = ({
            Class: Class,
            KeyWords: KeyWords,
            RestrictCode: Restrict,
            Syntax: Syntax,
            Description: Description,
            SeeAlso: SeeAlso
        })

        return JSN

    }

    getKeyWords = (item) => {

        let Para = item.substring(item.indexOf('\n') + 1, item.length - 1)

        let Line = Para.substring(3, Para.indexOf('\n') - 1)


        if (!Line.includes('~')) {

            return this.Parse_KeyWords(Line)


        } else if (Line.includes(`~`)) {
            // parse Single & Multiple keywords

            let Keys = Line.split(`~`)[1]
            let Class = Line.split('~')[0]


          //  alert(Keys)
            return this.Parse_KeyWords(Keys)

            //  if (k[0].includes('MAR')) alert(k)




        }

        return "undefined"

    }

    Parse_KeyWords = (KeyLine) => {


        if (KeyLine == '' || KeyLine == ' ' || KeyLine == '\n') return 'undefined'

        // if (KeyLine.includes(`WEAPON SEIZE`)) alert(KeyLine)

       
         if (KeyLine.substring(0,1) == ' ') KeyLine = KeyLine.replace(' ' , '')
        //  if (KeyLine.substring(0,1) == ' ') alert(KeyLine)

        if (KeyLine.substring(0, 1) == `'`) {

            // if (KeyLine.includes(`WEAPON SEIZE`)) alert(KeyLine)

            if (KeyLine.includes(`' `)) { KeyLine = KeyLine.split(`' `) } else { KeyLine = [KeyLine] }

            // two times for initial & last comma
            KeyLine = KeyLine.map((item) => item.includes(`'`) ? item.replace(`'`, '') : item)
            KeyLine = KeyLine.map((item) => item.includes(`'`) ? item.replace(`'`, '') : item)
            KeyLine = KeyLine.map((item) => item.includes(`,`) ? item.replace(`,`, '') : item)
            KeyLine = KeyLine.map((item) => item.substring(0,1) === ' ' ? item.replace(' ', '') : item)
            KeyLine = KeyLine.filter((item) => item !== '')
            KeyLine = KeyLine.filter((item) => item !== ' ')


            // clean up & return: KeyLine = CleanUp(KeyLine)
            return KeyLine
        }


        if (KeyLine.substring(0, 1) !== `'`) {

            // GET ALL INDEX of commas

            let Indexes = [], ValuesInInverts = []
            try { Indexes = [...KeyLine.matchAll(new RegExp(`'`, 'gi'))].map(a => a.index); } catch (ex) { }


            // extract & trim inverted values

            if (KeyLine.includes(`'`)) {

                for (let n = 0; Indexes[n] != undefined; n++) {
                    if (!n % 2 == 0) {
                        let str = KeyLine.substring(Indexes[n], Indexes[n - 1])
                        ValuesInInverts.push(str)
                    }
                }

                // extract remaining values | struck off inverted values

                ValuesInInverts.forEach((val) => {
                    KeyLine = KeyLine.replace(val, '')
                })



                KeyLine = KeyLine.replace(`'`, '')
                KeyLine = KeyLine.replace(`,`, '')
                KeyLine = KeyLine.split(' ')


                // cleanup

                this.CleanUp(KeyLine)
                this.CleanUp(ValuesInInverts)



                ValuesInInverts = ValuesInInverts.map((item) => item.substring(0, 1) == `'` ? item.replace(`'`, '') : item)
                ValuesInInverts = ValuesInInverts.filter((item) => item !== ' ')



                KeyLine = KeyLine.concat(ValuesInInverts)

                // if (KeyLine.includes('BIO')) alert(KeyLine)


                return KeyLine



                // if key includes ' 

            } else {



                KeyLine = KeyLine.includes(' ') ? KeyLine.split(' ') : [KeyLine];

                return KeyLine

                // if (KeyLine[0].includes('UND')) alert(KeyLine[0])

            }




        }




        // alert(KeyLine)
        //  return KeyLine



    }

    valClean = () => {

    }

    CleanUp = (array) => {
        array.forEach((item, index) => {
            if (item.includes(',')) item.replace(',', '')
            if (item.includes(`'`)) item.replace(`'`, '')
            if (item.includes(' ')) item.replace(' ', '')
            if (item == '') array.splice(index, index + 1)
        })
    }

    getClass = (item) => {

        let Para = item.substring(item.indexOf('\n') + 1, item.length - 1)
        let Line = Para.substring(3, Para.indexOf('\n') - 1)


        if (Line.includes(`~`)) {

            let Keys = Line.split(`~`)[1]
            let Class = Line.split('~')[0]


            if (Class.substring(0, 1) == ' ') { Class = Class.substring(1, Keys.length - 1) }
            if (Class.substring(0, 1) == `'`) { Class = Class.substring(1, Keys.length - 1) }

            if (Class) { return Class }
        }


        return 'undefined'

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

    AutoComplete = (value) => {
        // @Info |item| (Item:string()) & ((Item.Syntax !== Nil)) @Item.Syntax |Sx| ((Sx != Nil))  ((Synx(0,val.length))) 

        this.state.Info.forEach((Item) => {
            console.log(JSON.stringify(Item))
            if (Item.Syntax !== "undefined" && Item.Syntax !== undefined) {
                Item.Syntax.forEach((Synx) => {
                    if (Synx !== "undefined" && Synx !== undefined) {
                        if (Synx.substring(0, value.length) == value) {
                            let neobj = {
                                Syntax: Synx,
                                Info: Item
                            }
                            console.log(neobj)
                            this.Resp.push(neobj)
                        }
                    }
                })
                this.setState({ SearchResults: this.Resp })
            }
        })
        this.Resp = []
        if (value == "") this.setState({ SearchResults: [] })
    }


}





