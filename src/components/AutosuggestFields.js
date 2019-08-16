import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
//import labelSuggestions from './IndicationSuggestions';


const indicationLabelSuggestions = [
  {"label": "AIDS-Related Lymphoma"}, 
  {"label": "ALL"}, {"label": "AML"}, 
  {"label": "Adenocarcinoma"}, 
  {"label": "Adenosquamous Carcinoma"}, 
  {"label": "Adrenocortical Carcinoma"}, 
  {"label": "Anal Cancer"}, {"label": "Angiosarcoma"}, 
  {"label": "Appendiceal Cancer"}, 
  {"label": "B-Cell Lymphoma"}, 
  {"label": "Basal Cell Carcinoma"}, 
  {"label": "Biliary Tract Cancer"}, 
  {"label": "Biphenotypic Acute Leukemia"}, 
  {"label": "Bladder Cancer"}, 
  {"label": "Bone Cancer"}, 
  {"label": "Bowel Cancer"}, 
  {"label": "Brain Cancer"}, 
  {"label": "Breast CAncer"}, 
  {"label": "Breast Cancer"}, 
  {"label": "Breast cancer"}, 
  {"label": "CLL"}, 
  {"label": "CML"}, 
  {"label": "Cancer"}, 
  {"label": "Carcinoma"}, 
  {"label": "Cervical Cancer"}, 
  {"label": "Chondrosarcoma"}, 
  {"label": "Choroid Plexus Carcinoma"}, 
  {"label": "Chronic Myelomonocytic Leukemia (CMML)"}, 
  {"label": "Colorectal Cancer"}, 
  {"label": "Cystadenocarcinoma"}, 
  {"label": "Esophageal Cancer"}, 
  {"label": "Ewing Sarcoma"}, 
  {"label": "Eye Cancer"}, 
  {"label": "Female Genital Neoplasms"}, 
  {"label": "Gastric Cancer"}, 
  {"label": "Gastroesophageal Junction (GEJ) Adenocarcinoma"}, 
  {"label": "Gastrointestinal stromal tumor (GIST)"}, 
  {"label": "Germ Cell Tumor"}, 
  {"label": "Glioma"}, 
  {"label": "Glomus Tumor"}, 
  {"label": "Head and Neck Cancer"}, 
  {"label": "Heart Cancer"}, 
  {"label": "Hemangiopericytoma"}, 
  {"label": "Hemangiosarcoma"}, 
  {"label": "Hematological Cancers"}, 
  {"label": "Hepatocellular Carcinoma"}, 
  {"label": "Hepatocellular carcinoma"}, 
  {"label": "Hodgkin Lymphoma"}, 
  {"label": "Intestinal Cancer"}, 
  {"label": "Juvenile Myelomonocytic Leukemia (JMML)"}, 
  {"label": "Kaposi Sarcoma"}, 
  {"label": "Leiomyosarcoma"}, 
  {"label": "Leukemia"}, 
  {"label": "Liposarcoma"}, 
  {"label": "Lung Cancer"}, 
  {"label": "Lymphangioma"}, 
  {"label": "Lymphoma"}, 
  {"label": "Male Genital Neoplasms"}, 
  {"label": "Mast-Cell Sarcoma"}, 
  {"label": "Medullary Carcinoma"}, 
  {"label": "Melanoma"}, 
  {"label": "Mesenchymoma"}, 
  {"label": "Mesothelioma"}, 
  {"label": "Metastatic Tumors"}, 
  {"label": "Mixed Lineage Leukemia"}, 
  {"label": "Multiple Myeloma"}, 
  {"label": "Myelodysplastic Syndrome"}, 
  {"label": "Myelodysplastic Syndrome (MDS)"}, 
  {"label": "Myelofibrosis"},
  {"label": "Myeloproliferative Neoplasms"}, 
  {"label": "Nervous System Cancer"}, 
  {"label": "Neuroblastoma"}, 
  {"label": "Neuroectodermal Tumor"}, 
  {"label": "Neuroendocrine Tumor"}, 
  {"label": "Neurofibroma"}, 
  {"label": "Neurofibromatosis 1"}, 
  {"label": "Neurofibromatosis 2"}, 
  {"label": "Neurofibrosarcoma"}, 
  {"label": "Non-Hodgkin Lymphoma"}, 
  {"label": "Non-Small-Cell Lung Cancer"}, 
  {"label": "Osteosarcoma"}, 
  {"label": "Ovarian CAncer"}, 
  {"label": "Ovarian Cancer"}, 
  {"label": "Pancreatic Cancer"}, 
  {"label": "Paraganglioma"},
  {"label": "Penile Cancer"}, 
  {"label": "Perivascular Epithelioid Cell Cancer"}, 
  {"label": "Pregnancy-Related Cancer"}, 
  {"label": "Primary Central Nervous System Lymphoma (PCNSL)"}, 
  {"label": "Prolymphocytic Leukemia"}, 
  {"label": "Prostate Cancer"}, 
  {"label": "Remove"}, 
  {"label": "Renal Cell Carcinoma"}, 
  {"label": "Rhabdoid Tumor"}, 
  {"label": "Rhabdomyosarcoma"}, 
  {"label": "Sarcoma"}, 
  {"label": "Sex Cord-Gonadal Stromal Tumors"}, 
  {"label": "Skin Cancer"}, 
  {"label": "Small Cell Lung Cancer"}, 
  {"label": "Soft-Tissue Sarcoma"}, 
  {"label": "Solitary Fibrous Tumors"}, 
  {"label": "Spinal Cancer"}, 
  {"label": "Squamous Cell Carcinoma"}, 
  {"label": "Squamous cell carcinoma"}, 
  {"label": "Sweat Gland Tumor"}, 
  {"label": "T-Cell Leukemia"}, 
  {"label": "T-Cell Lymphoma"}, 
  {"label": "Testicular Cancer"}, 
  {"label": "Thymus Cancer"}, 
  {"label": "Thyroid Cancer"}, 
  {"label": "Transitional Cell Carcinoma"}, 
  {"label": "Urological Cancer"}, 
  {"label": "Uterine Cancer"}, 
  {"label": "Vaginal Cancer"}
]

const indicationSublabelSuggestions = [
  {"sublabel": "B-Cell Lymphoblastic Leukemia"}, {"sublabel": "Precursor B-Cell Lymphoblastic Leukemia-Lymphoma"}, {"sublabel": "Precursor Cell Lymphoblastic Leukemia-Lymphoma"}, {"sublabel": "Precursor T-Cell Lymphoblastic Leukemia-Lymphoma"}, {"sublabel": "T-cell"}, {"sublabel": "Acute Basophilic Leukemia"}, {"sublabel": "Acute Eosinophilic Leukemia"}, {"sublabel": "Acute Erythroblastic Leukemia"}, {"sublabel": "Acute Monocytic Leukemia"}, {"sublabel": "Acute Myeloblastic Leukemia"}, {"sublabel": "Acute Myeloid Leukemia"}, {"sublabel": "Acute Myelomonocytic Leukemia"}, {"sublabel": "Blastic Plasmacytoid Dendritic Cell Neoplasm (BPDCN)"}, {"sublabel": "Chronic Eosinophilic Leukemia"}, {"sublabel": "Leukemia, Basophilic, Acute"}, {"sublabel": "Leukemia, Eosinophilic, Acute"}, {"sublabel": "Leukemia, Erythroblastic, Acute"}, {"sublabel": "Leukemia, Mast-Cell"}, {"sublabel": "Leukemia, Megakaryoblastic, Acute"}, {"sublabel": "Leukemia, Monocytic, Acute"}, {"sublabel": "Leukemia, Myeloblastic, Acute"}, {"sublabel": "Leukemia, Myelocytic , Acute"}, {"sublabel": "Leukemia, Myeloid, Acute"}, {"sublabel": "Leukemia, Myelomonocytic, Acute"}, {"sublabel": "Magakaryoblastic Leukemia"}, {"sublabel": "Mast-Cell Leukemia"}, {"sublabel": "Myeloid Sarcoma"}, {"sublabel": "Signet Ring Cell Carcinoma"}, {"sublabel": "Adrenal Gland Neoplasms"}, {"sublabel": "Cholangiocarcinoma"}, {"sublabel": "Gallbladder Cancer"}, {"sublabel": "Urinary Bladder Neoplasms"}, {"sublabel": "Urothelial Cancer"}, {"sublabel": "Bone Marrow Neoplasms"}, {"sublabel": "Bone Sarcoma"}, {"sublabel": "Giant Cell Tumor"}, {"sublabel": "Osteosarcoma"}, {"sublabel": "Brain Stem Neoplasms"}, {"sublabel": "Cerebellar Neoplasms"}, {"sublabel": "Infratentorial Neoplasms"}, {"sublabel": "Meningeal Neoplasms"}, {"sublabel": "Pineoblastoma"}, {"sublabel": "Pituitary Neoplasms"}, {"sublabel": "Supratentorial Neoplasms"}, {"sublabel": "DCIS, Breast"}, {"sublabel": "Inflammatory Breast Cancer"}, {"sublabel": "Intraductal, Noninfiltrating Carcinoma"}, {"sublabel": "Lobular Carcinoma"}, {"sublabel": "Male Breast Cancer"}, {"sublabel": "Mucinous Breast Carcinoma"}, {"sublabel": "Phyllodes Tumor"}, {"sublabel": "Triple Negative Breast Cancer"}, {"sublabel": "Unilateral Breast Neoplasms"}, {"sublabel": "B-Cell Leukemia"}, {"sublabel": "Leukemia, B-Cell"}, {"sublabel": "Leukemia, Lymphocytic, Chronic, B-Cell"}, {"sublabel": "Chronic Neutrophilic Leukemia"}, {"sublabel": "Leukemia, Myelogenous, Chronic, BCR-ABL Positive"}, {"sublabel": "Leukemia, Myeloid, Accelerated Phase"}, {"sublabel": "Leukemia, Myeloid, Chronic, Atypical, BCR-ABL Negative"}, {"sublabel": "Leukemia, Myeloid, Chronic-Phase"}, {"sublabel": "Leukemia, Myelomonocytic, Juvenile"}, {"sublabel": "Leukemia, Neutrophilic, Chronic"}, {"sublabel": "Abdominal Neoplasms"}, {"sublabel": "Advanced Solid Tumors With an Alteration of the PIK3CA Gene"}, {"sublabel": "Brain Metastases"}, {"sublabel": "Childhood Cancer"}, {"sublabel": "Digestive System Neoplasms"}, {"sublabel": "Endocrine Gland Neoplasms"}, {"sublabel": "HER2/Neu Negative"}, {"sublabel": "HIV patients"}, {"sublabel": "Her2 Amplified Solid Tumors"}, {"sublabel": "Lymphonodal Metastasis"}, {"sublabel": "MSI High"}, {"sublabel": "Mediastinal Neoplasms"}, {"sublabel": "Neoplasm Recurrence, Local"}, {"sublabel": "Neoplasm Regression, Spontaneous"}, {"sublabel": "Neoplasm, Residual"}, {"sublabel": "Neoplasms by Histologic Type"}, {"sublabel": "Neoplasms by Site"}, {"sublabel": "Neoplasms, Adipose Tissue"}, {"sublabel": "Neoplasms, Connective and Soft Tissue"}, {"sublabel": "Neoplasms, Glandular and Epithelial"}, {"sublabel": "Neoplasms, Hormone-Dependent"}, {"sublabel": "Neoplasms, Multiple Primary"}, {"sublabel": "Pelvic Neoplasms"}, {"sublabel": "Peritoneal Neoplasms"}, {"sublabel": "Solid Tumors"}, {"sublabel": "Urogenital Neoplasms"}, {"sublabel": "Yolk Sac Tumor"}, {"sublabel": "Carcinosarcoma"}, {"sublabel": "Mesenchymal Chondrosarcoma"}, {"sublabel": "Analrectal"}, {"sublabel": "Colon Cancer"}, {"sublabel": "Rectal Cancer"}, {"sublabel": "Sigmoid Neoplasms"}, {"sublabel": "Mucinous Adenocarcinoma"}, {"sublabel": "Serous"}, {"sublabel": "Conjunctival Neoplasms"}, {"sublabel": "Intraocular Lymphoma"}, {"sublabel": "Iris Neoplasms"}, {"sublabel": "Optic Nerve Glioma"}, {"sublabel": "Optic Nerve Neoplasms"}, {"sublabel": "Retinal Neoplasms"}, {"sublabel": "Retinoblastoma"}, {"sublabel": "Uveal Neoplasms"}, {"sublabel": "Adenocarcinoma, Clear Cell"}, {"sublabel": "Duodenal Neoplasms"}, {"sublabel": "Astrocytoma"}, {"sublabel": "Brain Stem Glioma"}, {"sublabel": "Ganglioglioma"}, {"sublabel": "Glioblastoma"}, {"sublabel": "Gliosarcoma"}, {"sublabel": "Medulloblastoma"}, {"sublabel": "Oligodendroglioma"}, {"sublabel": "Pontine Glioma"}, {"sublabel": "Buccal Mucosa Carcinoma"}, {"sublabel": "Carcinoma, Adenoid Cystic Carcinoma"}, {"sublabel": "Carotid Body Tumor"}, {"sublabel": "Ear Neoplasms"}, {"sublabel": "Endodermal Sinus Tumor"}, {"sublabel": "Esthesioneuroblastoma, Olfactory"}, {"sublabel": "Hypopharyngeal Neoplasms"}, {"sublabel": "Larynx Cancer"}, {"sublabel": "Mandibular Neoplasms"}, {"sublabel": "Maxillary Neoplasms"}, {"sublabel": "Maxillary Sinus Neoplasms"}, {"sublabel": "Mucoepidermoid Carcinoma"}, {"sublabel": "Nasopharyngeal"}, {"sublabel": "Nose Neoplasms"}, {"sublabel": "Odontogenic Tumors"}, {"sublabel": "Orbital Neoplasms"}, {"sublabel": "Oropharyngeal"}, {"sublabel": "Otorhinolaryngologic Neoplasms"}, {"sublabel": "Paranasal Sinus Neoplasms"}, {"sublabel": "Parotid Neoplasms"}, {"sublabel": "Pharyngeal Neoplasms"}, {"sublabel": "Salivary Gland"}, {"sublabel": "Skull Base Neoplasms"}, {"sublabel": "Throat Cancer"}, {"sublabel": "Tongue Neoplasms"}, {"sublabel": "Tracheal Neoplasms"}, {"sublabel": "Upper Aerodigestive Tract"}, {"sublabel": "Hepatoblastoma"}, {"sublabel": "Ileal Neoplasms"}, {"sublabel": "Jejunal Neoplasms"}, {"sublabel": "Bronchial Neoplasms"}, {"sublabel": "Respiratory Tract Neoplasms"}, {"sublabel": "Lymphangiomyoma"}, {"sublabel": "Lymphangiosarcoma"}, {"sublabel": "Micrometastasis"}, {"sublabel": "Leukemia, Biphenotypic, Acute"}, {"sublabel": "Preleukemia"}, {"sublabel": "Osteomyelofibrosis"}, {"sublabel": "Primary Myelofibrosis"}, {"sublabel": "Neoplasms, Neuroepithelial"}, {"sublabel": "Nerve Sheath Neoplasms"}, {"sublabel": "Ganglioneuroblastoma"}, {"sublabel": "Carcinoid Tumor"}, {"sublabel": "Gastroenteropancreatic"}, {"sublabel": "Lung"}, {"sublabel": "Pancreatic"}, {"sublabel": "Pituitary"}, {"sublabel": "Skin"}, {"sublabel": "Anaplastic Large-Cell Lymphoma"}, {"sublabel": "Burkitt Lymphoma"}, {"sublabel": "Cutaneous T-Cell Lymphoma (CTCL)"}, {"sublabel": "Diffuse Large B-Cell"}, {"sublabel": "Follicular Lymphoma"}, {"sublabel": "Hairy Cell Leukemia"}, {"sublabel": "Immunoblastic Large-Cell Lymphoma"}, {"sublabel": "Leukemia, Large Granular Lymphocytic"}, {"sublabel": "Lymphoma, Large-Cell, Immunoblastic"}, {"sublabel": "Lymphoma, Primary Effusion"}, {"sublabel": "MALT Lymphoma"}, {"sublabel": "MALT lymphoma"}, {"sublabel": "Mantle-Cell"}, {"sublabel": "Marginal Zone B-Cell Lymphoma"}, {"sublabel": "Mixed Cell"}, {"sublabel": "NK-T-Cell Lymphoma"}, {"sublabel": "Peripheral T-Cell Lymphoma (PTCL)"}, {"sublabel": "Primary Cutaneous Anaplastic Large Cell Lymphoma"}, {"sublabel": "Primary Mediastinal B cell lymphoma (PMBCL)"}, {"sublabel": "T-Cell Lymphoma"}, {"sublabel": "T-cell Lymphoma"}, {"sublabel": "Bronchiolo-Alveolar Adenocarcinoma"}, {"sublabel": "Large Cell Carcinoma"}, {"sublabel": "Brenner Tumor"}, {"sublabel": "Fallopian Tube Cancer"}, {"sublabel": "Ovarian Cancer"}, {"sublabel": "Sertoli-Leydig Cell Tumor"}, {"sublabel": "Islet Cell Carcinoma"}, {"sublabel": "Pancreatic Ductal Carcinoma"}, {"sublabel": "Paraganglioma, Extra-Adrenal"}, {"sublabel": "Choriocarcinoma"}, {"sublabel": "Trophoblastic Neoplasms"}, {"sublabel": "Trophoblastic Tumor, Placental Site"}, {"sublabel": "Leukemia, Prolymphocytic, B-Cell"}, {"sublabel": "Leukemia, Prolymphocytic, T-Cell"}, {"sublabel": "Prolymphocytic T-Cell Leukemia"}, {"sublabel": "Castration-Resistant Prostate Cancer (CRPC)"}, {"sublabel": "Wilms Tumor"}, {"sublabel": "Alveolar"}, {"sublabel": "Embryonal"}, {"sublabel": "Granulosa Cell Tumor"}, {"sublabel": "Dermatofibrosarcoma"}, {"sublabel": "Merkel Cell Carcinoma"}, {"sublabel": "Squamous Cell"}, {"sublabel": "Alveolar Soft Part"}, {"sublabel": "Clear Cell"}, {"sublabel": "Desmoplastic Small Round Cell Tumor"}, {"sublabel": "Fibrosarcoma"}, {"sublabel": "Leiomyosarcoma"}, {"sublabel": "Leptomeningeal"}, {"sublabel": "Liposarcoma"}, {"sublabel": "Liposarcoma, Myxoid"}, {"sublabel": "Retroperitoneal Neoplasms"}, {"sublabel": "Spindle Cell Sarcoma"}, {"sublabel": "Synovial Sarcoma"}, {"sublabel": "Spinal Cord Neoplasms"}, {"sublabel": "Verrucous Carcinoma"}, {"sublabel": "Leydig Cell Tumor"}, {"sublabel": "Lymphoma Large B-cell"}, {"sublabel": "Anaplastic"}, {"sublabel": "Follicular"}, {"sublabel": "Huerthle cell carcinoma"}, {"sublabel": "Medullary"}, {"sublabel": "Papillary"}, {"sublabel": "Mixed Tumor, Mullerian"}, {"sublabel": "Neoplasms, Adnexal and Skin Appendage"}, {"sublabel": "Vulvar Neoplasms"}
]

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      margin="dense"
      variant="outlined"
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : indicationLabelSuggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 50,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  LabelSontainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(0),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  LabelSist: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function IntegrationAutosuggest() {
  const classes = useStyles();
  //const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    single: '',
    popper: '',
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Tumor Type',
          placeholder: 'Select a Tumor Type',
          value: state.single,
          onChange: handleChange('single'),
        }}
        theme={{
          container: classes.container,
          LabelSontainerOpen: classes.LabelSontainerOpen,
          LabelSist: classes.LabelSist,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    </div>
  );
}