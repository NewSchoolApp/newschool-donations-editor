import { TextField, Button, Box, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import SaveIcon from "@material-ui/icons/Save";
import { http } from "./services/config";
import "./App.css";
import { useEffect, useState } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [totalValue, setTotalValue] = useState();
  const [donors, setDonors] = useState();
  const [baskets, setBaskets] = useState();
  const [impactedPeople, setImpactedPeople] = useState();
  const [families, setFamilies] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleGetDonationsData = async () => {
      const donations = await http.get("/donations");
      const [
        { donated_baskets, donors, families, impacted_people, total_value },
      ] = donations.data;

      setTotalValue(total_value);
      setDonors(donors);
      setBaskets(donated_baskets);
      setImpactedPeople(impacted_people);
      setFamilies(families);
    };
    handleGetDonationsData();
  }, []);

  const handleSaveContent = async () => {
    const body = {
      total_value: totalValue,
      donors,
      impacted_people: impactedPeople,
      families,
      donated_baskets: baskets,
    };

    const donation = await http.put("/donations/1", body);
    if (donation.data.id) {
      setSuccess(true);
      setTimeout(() => {
        return setSuccess(false);
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => {
        return setError(false);
      }, 2000);
    }
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <div className="App">
      <Box display="flex" width="40%" flexDirection="column" marginX="auto">
        <TextField
          label="Cestas"
          type="number"
          value={baskets}
          onChange={(e) => setBaskets(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          margin="normal"
          label="Doadores"
          type="number"
          value={donors}
          onChange={(e) => setDonors(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="normal"
          label="Familias"
          type="number"
          value={families}
          onChange={(e) => setFamilies(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="normal"
          label="Pessoas"
          type="number"
          value={impactedPeople}
          onChange={(e) => setImpactedPeople(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="normal"
          label="Valor Total"
          type="number"
          value={totalValue}
          onChange={(e) => setTotalValue(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          margin="normal"
          style={{ marginTop: 20 }}
          onClick={() => handleSaveContent()}
        >
          Save
        </Button>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            Dados atualizados com sucesso!
          </Alert>
        </Snackbar>

        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error">
            Erro ao atualizar os dados!
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default App;
