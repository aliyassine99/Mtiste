export class Patient{



  constructor(
    public id?: number,
    public cin?:string ,
    public nom?: string,
    public prenom?: string,
    public dateNaissance?: Date,
    public ville?: string,
    public adresse?: string,
    public telephone?: number,
    public email?: string,
    public groupeSanguins?: string
    ){}
}
