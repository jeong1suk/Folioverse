import { Schema, model } from "mongoose";

//CertificateSchema 정의하기
const CertificateSchema = new Schema({
  date: { type: String, required: true },
  agency: { type: String, required: true },
});

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };

// Table career {
//   id objectId [primary key]
//   yearly integer [not null]
//   job varchar [not null]
// }

// Table certificate {
//     id objecrId [primary key]
//     date varchar [not null]
//     agency varchar [not null]
//   }
