import { CertificateModel } from "../schemas/certificate.js";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findAll() {
    const certificate = await CertificateModel.find({});
    return certificate;
  }

  static async findAllByUserId(user_id) {
    const certificate = await CertificateModel.find(user_id);
    return certificate;
  }

  static async findById(_id) {
    const certificate = await CertificateModel.findById(_id);
    return certificate;
  }

  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async delete(_id) {
    const deletedCertificate = await CertificateModel.deleteOne(_id);
    return deletedCertificate;
  }
}

export { Certificate };
