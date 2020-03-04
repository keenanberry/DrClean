# dbClean
> Recommendation app for monthly cleaning of pharmaceutical database entries.

[![Build Status][travis-image]][travis-url]

Built for a summer internship project, this flask-react app is designed to take a formatted excel document as input, the classification task (tumor or drug data), and the number of neighbors from the "clean" database entries that the user would like to compare his/her unclean entries with.

### API
A collaborative filtering method is used to generate label suggestions for unclean database entries. The inputted excel file should contain both labeled and unlabeled database entries. The text entries are normalized and transformed (TF-IDF vectorization), then a nearest neighbors algorithm (Scikit-Learn) is used to generate the nearest labeled neighborhood for each of the unlabeled entries. The neighbors in the neighborhood are rendered in the UI component. 

### UI
An interactive table interface is used to present recommendations to the user. The user can select multiple labels (and sublabels) for each unlabeled entry in the excel file. In addition, if the correct label is not presented the user may also type the correct label/sublabel after clicking "Add Other." The text boxes are autoselect components that dynamically render suggestions as the user begins to type potential label names.

## Installation & Startup

[Install Docker](https://docs.docker.com/v17.09/engine/installation/)

OS X & Linux:

```sh
git clone https://github.com/keenanberry/dbClean.git
cd dbClean
docker-compose up -d
```

Windows:

For Windows users, please note the "System Requirements" section at the following page: https://docs.docker.com/docker-for-windows/install/
Since the compose uses mounted volumes, you'll also need to create a new Windows environment variable `COMPOSE_CONVERT_WINDOWS_PATHS` and set the variable value to `1`. Then you should be able to run the commands below.

```sh
git clone https://github.com/keenanberry/dbClean.git
cd dbClean
docker-compose up -d
```

When finished...

```sh
docker-compose down
```

## Usage examples and info

The following screenshot displays the upload (home) page. The user should first upload a correctly formatted excel file, next the user needs to select the classification task: "tumor" or "drug." Then the user should select the number of nearest neighbors to display in the labelling component of this application (5-11 is recommended). Click "submit" to begin labelling the unclean entries.

![](demo/upload.png)

If the model does not display the correct label and sublabel, the user can click the "Add Other" button on the bottom left of the table component. This will add a row to the table in which the user may type the correct laebl/sublabel. Note that the text box components have an autoselect feature which shows the entries that match what the user has begun typing.

![](demo/add-other.gif)

During the labelling section of this app, the user can navigate forwards and backwards to double check or correct previous label assignments. However, once the user reaches the final entry the "next" button changes to "finish." Upon clicking the "finish" button all labels will be saved according to their current state. 

![](demo/forward-back.gif)

After clicking "finish" the user will be prompted with the download page. Click "download" to write the new labels to the original excel file that was uploaded.

![](demo/download.png)


## Meta

Keenan Berry – keenanberry22@gmail.com

[https://github.com/keenanberry/github-link](https://github.com/keenanberry/)

<!-- Markdown link & img dfn's -->
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.com/keenanberry/dbClean
[wiki]: https://github.com/yourname/yourproject/wiki
