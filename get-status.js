const Web3 = require('web3');

function handleError(ipAddress, port, errorMsg) {
  let output = '';

  output += '=========================================================' + '\n';
  output += 'IP: ' + ipAddress + ':' + port + '\n';
  output += errorMsg + '\n';

  console.log(output);
}

function getSyncInfo(ipAddress, port) {
  let web3, coinbase, syncing, blockNumber;

  try {
    web3 = new Web3(new Web3.providers.HttpProvider('http://' + ipAddress + ':' + port));
  } catch (err) {
    return handleError(ipAddress, port, err.message);
  }

  try {
    coinbase = web3.eth.coinbase;
    syncing = web3.eth.syncing;
    blockNumber = web3.eth.blockNumber;
  } catch (err) {
    return handleError(ipAddress, port, err.message);
  }

  let output = '';

  output += '=========================================================' + '\n';
  output += 'Instance: ' + ipAddress + ':' + port + '\n';
  output += 'Account: ' + coinbase + '\n';
  output += 'blockNumber: ' + blockNumber + '\n';

  if (syncing) {
    output += '' +
      'Block diff: ' +
      (parseInt(syncing.highestBlock) - parseInt(syncing.currentBlock)) + ' ' +
      '(' + parseInt(syncing.currentBlock) + '/' + parseInt(syncing.highestBlock) + ')' +
      '\n';
    output += '' +
      'State diff: ' +
      (parseInt(syncing.knownStates) - parseInt(syncing.pulledStates)) + ' ' +
      '(' + parseInt(syncing.pulledStates) + '/' + parseInt(syncing.knownStates) + ')' +
      '\n';
    output += 'startingBlock: ' + syncing.startingBlock + '\n';
  } else {
    output += 'Synced!' + '\n';
  }

  console.log(output);
}

getSyncInfo(process.argv[2], process.argv[3]);
