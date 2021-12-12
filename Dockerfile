FROM node:17.2.0

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@8.1.4 &&\
  npm install --global @google/clasp@2.4.1

ENV HOME=/home/app
USER app
WORKDIR $HOME/clasp