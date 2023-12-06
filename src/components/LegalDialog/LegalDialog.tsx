import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const LegalDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Información Legal</DialogTitle>
      <DialogContent>
        <h3>Ley de Competencia</h3>
        <ul>
          <li>
            No divulgar la información contenida en el sitio a nadie fuera de
            Etex.
          </li>
          <li>
            Aunque la información utilizada en la construcción de este sitio se
            ha obtenido de fuentes públicas, esta ha sido procesada para
            análisis internos, por lo que es altamente confidencial para Etex y
            solo se puede utilizar con fines internos. Para obtener más detalles
            sobre las fuentes, haga click&nbsp;
            <a
              href="https://github.com/Lucas-Vergara/etexScrap"
              target="_blank"
              rel="noreferrer"
            >
              aquí
            </a>
            .
          </li>
          <li>
            Al utilizar la información de acuerdo con lo aquí señalado, incluya
            siempre la fuente y la naturaleza altamente confidencial de la
            información.
          </li>
          <li>
            En todo momento, cumpla con la política de Competencia y
            Antimonopolio de Etex.
          </li>
        </ul>

        <h3>Información Confidencial y Protegida</h3>
        <ul>
          <li>
            La información disponible en este sitio es comercialmente sensible y
            altamente confidencial...
          </li>
          <li>Utilícela con fines exclusivamente internos.</li>
          <li>
            No divulgue la información contenida en el sitio a ningún tercero,
            ya sea directa o indirectamente.
          </li>
          <li>No haga copias de la información.</li>
        </ul>

        <h3>Incumplimiento de las recomendaciones</h3>
        <ul>
          <li>
            Informe de inmediato a su supervisor, punto de contacto legal y/o al
            Oficial de Cumplimiento de Etex...
          </li>
          <li>
            El incumplimiento de cualquiera de estas recomendaciones puede
            resultar en sanciones de acuerdo con el Código de Conducta de Etex,
            el contrato de trabajo y/o la legislación aplicable, incluida la
            posibilidad de despido.
          </li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LegalDialog;
