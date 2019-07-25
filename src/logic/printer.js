import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const printDivisions = (adapciak) => {
  const doc = {
      content: adapciakIntoTable(adapciak),
      styles: {
        eventHeader: {
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: 5,
        },
        teamHeader: {
          fontSize: 20,
          bold: true,
          margin: [0, 15, 0, 5],
        },
      }
  };
  pdfMake.createPdf(doc).download();
}

const adapciakIntoTable = adapciak => {
    let output = [];
    adapciak.events.forEach((event, index) => {
      output.push({text: `EVENT #${index + 1}`, style: 'eventHeader'});
      output = output.concat(eventInfoTable(event));
    });
    return output;
}

const eventInfoTable = event => {
  const output = [];
  event.forEach((team, index) => {
    output.push({text: `TEAM #${index+ 1}`, style: 'teamHeader'});
    output.push(teamInfoTable(team));
  });
  return output;
}

const teamInfoTable = team => {
  const players = [];
  team.forEach(player => {
    const playerRow = [];
    playerRow.push(player.name);
    playerRow.push(player.surname);
    players.push(playerRow);
  });

  return {
      layout: 'lightHorizontalLines',
      table: {        
        body: players
      }
    }
}

export default printDivisions;