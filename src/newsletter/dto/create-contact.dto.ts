export class CreateContactDto {
  email: string;
  listIds: [number];
  attributes: {
    PRENOM: string;
    NOM: string;
    DATE_DE_NAISSANCE: string;
    SMS: string;
  };
}
