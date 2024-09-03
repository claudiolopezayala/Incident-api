import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../services/email.service';
import { IncidentDataSource } from '../datasource/incident.datasource';
import { generateIncidentEmailTemplate } from '../templates/email.templates';

export const EmailJob = () => {
  const emailService = new EmailService();
  const incidentDataSource = new IncidentDataSource();

  cron.schedule('*/10 * * * * *', async () => {
    try {
      const incidents = await IncidentModel.find({ isEmailSent: false });
      if (!incidents.length) {
        console.log("No hay incidentes para enviar correos");
        return;
      }
      console.log(`Procesando ${incidents.length} incidentes.`);

      await Promise.all(
        incidents.map(async (incident) => {
          const htmlBody = generateIncidentEmailTemplate(
            incident.title,
            incident.description,
            incident.lat,
            incident.lng
          )
          await emailService.sendEmail({
            to: "claudioalejandro4@gmail.com",
            subject: 'Incidente :${incident.title}',
            htmlBody: htmlBody
          });
          console.log(`Correo enviado para el incidente con ID: ${incident.id}`);

          await incidentDataSource.updateIncident(incident._id.toString(), { ...incident, isEmailSent: true });

          console.log(`Incidente actualizado con ID: ${incident._id}`);
        })
      );
    } catch (error) {
      console.error("Error durante el envio de correos");
    }
  });
}