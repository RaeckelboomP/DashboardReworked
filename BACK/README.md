# Getting started with DashboardGP
**DashboardGP** is a web application wich aims to propose to the users to add differents widgets to their own dashboard.
## Structure
This project is splitted in two parts, the **Front** part (in React) and the **Back** part (in Java).
### Front
The Front part propose a **dashboard** with the possibility to add some **widgets** coming from different **services**, send requests to the Back part. These requests aims to get the relevant datas to build in the Front the widgets. We give to the user the possibility to configure the widgets.
### Back
The Back receive the requests from the Back, it ask **external API** to get relevant datas and process these datas before sending them to the Front.

