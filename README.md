# Ahead

Ahead is a modern financial dashboard for the modern investor. Users connect to their financial institution using Plaid and run investment simulations on selected accounts. It runs on a Flask backend.

## Get Started

#### 1. Run backend

```bash
cd ./python
pip3 install -r requirements.txt
./start.sh
```

#### 2. Run frontend

```bash
cd ./frontend
npm install
npm start
```

## Using the Application

1. Click "Get Started"
2. Authenticate using Plaid
   * Note: Plaid is in sandbox mode so a dummy account is used
   * Credentials for any institution:
     * username: user\_good
     * password: pass\_good
3. Choose an account from the menu on the left
4. Edit _Annual Contributions_, _Rate of Return_, and _Years of Growth_ to run investment simulations

## Screenshot

![Screen Shot 2022-08-13 at 5 57 38 PM](https://user-images.githubusercontent.com/99924051/194441218-2ab2cf19-d640-4375-ae49-9481e067ec4d.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
