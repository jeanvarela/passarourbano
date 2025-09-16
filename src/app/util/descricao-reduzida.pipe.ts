import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "descricaoReduzida"
})
export class DescricaoReduzida implements PipeTransform{

    transform(value: string, length: number): string {
        if (value.length > length){
            return value.substring(0,length) + '...'
        }

        return value
    }
}