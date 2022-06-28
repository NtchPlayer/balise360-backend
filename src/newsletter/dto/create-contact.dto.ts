export class CreateContactDto {
  email: string;
  listIds: [number];
  attributes: {
    PRENOM: string;
    NOM: string;
  };
}
