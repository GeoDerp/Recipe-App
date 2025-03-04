FROM registry.access.redhat.com/ubi9/ubi:latest

# Install git & nano 
RUN dnf install git nano -y

# Install NodeJS
ADD https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh /root/
RUN chmod +x /root/install.sh && /root/install.sh; \
\. "$HOME/.nvm/nvm.sh" \
nvm install 23