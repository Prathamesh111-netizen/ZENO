const Transporter= artifacts.require("Transporter");

module.exports = function(deployer) {
  deployer.deploy(Transporter);
};
