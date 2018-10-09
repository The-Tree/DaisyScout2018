# DaisyScout2016

In order to run locally, follow the following steps (ADMIN Privileges Required)
1. Download wampserver (wampserver.com)
2. Install it.
3. Copy all of the Scouting App files into the "/www" folder of wherever you installed Wamp
4. Run the wampmanager.exe
5. Open Chrome (let's be real, don't use Edge)
6. type "localhost" into the address bar
7. Voila!

If you want to change the default location of where wampserver looks for the App files edit the httpd.conf.
Copy and then comment out the 2 lines. Change the DocumentRoot and <Directory> tag to the location you desire. Example below:
c:\wamp64\bin\apache\apache2.4.27\conf\httpd.conf <<<<this is the file that must be modified for path to app.  default is www directory within wamp
#DocumentRoot "${INSTALL_DIR}/www"
#<Directory "${INSTALL_DIR}/www/">
Define DAISY_DIR C:/Users/panfi/Code/MissDaisy/DaisyScout2016
DocumentRoot "${DAISY_DIR}"
<Directory "${DAISY_DIR}">
