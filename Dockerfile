FROM registry.access.redhat.com/ubi9/ubi:latest

# Install git & nano 
RUN dnf install git nano -y

# Install nvm
ADD https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh /root/
RUN chmod +x /root/install.sh && /root/install.sh
RUN export NVM_DIR="$HOME/.nvm"; \
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; \ 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
nvm install 23

EXPOSE 4200/tcp

# Pull project 
COPY ./recipe-book /app/recipe-book
WORKDIR /app/recipe-book/

# # Install dependencies 
RUN source ~/.bashrc && npm install . --save-dev

# # Run server 
ENTRYPOINT ["npm", "start"]

