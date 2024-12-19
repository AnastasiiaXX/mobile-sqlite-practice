import * as SQLite from 'expo-sqlite';

export const initDatabase = () => {
    try {
        const db = SQLite.openDatabaseSync('cart.db');

        db.execSync(`
            CREATE TABLE IF NOT EXISTS cart (
                id INTEGER PRIMARY KEY NOT NULL,
                image TEXT,
                title VARCHAR(100),
                price REAL,
                quantity INTEGER NOT NULL
            );
        `);

        console.log('Table "Cart" successfully created', db);
    } catch (error) {
        console.error('Error creating table: ', error);
    }
};


export const onAddToCart = (product) => {
    try {
        const db = SQLite.openDatabaseSync('cart.db');

        db.runSync(`
            INSERT INTO cart (id, image, title, price, quantity) 
            VALUES (?, ?, ?, ?, ?) 
            ON CONFLICT(id) DO UPDATE SET quantity = quantity + 1;`, 
            [product.id, product.image, product.title, product.price, 1]
        );

        console.log('Product added to cart', product);
    } catch (error) {
        console.error('Error adding product to cart: ', error);
    }
};

export const getCartItems = () => {
    try {
        const db = SQLite.openDatabaseSync('cart.db');

        const cartItems = db.getAllSync('SELECT * FROM cart;', []);

        return cartItems;
    } catch (error) {
        console.error('Error fetching data from cart: ', error);
    }
};

export const deleteItem = (id) => {
    try {
        const db = SQLite.openDatabaseSync('cart.db');

        db.runSync('DELETE FROM cart WHERE id = ?;', [id]);

        console.log('Product removed from cart', id);
    } catch (error) {
        console.error('Error removing product from cart: ', error);
    }
};

export const onRemoveFromCart = (id) => {
    try {
        const db = SQLite.openDatabaseSync('cart.db');
        db.transaction(tx => {
          tx.executeSql('UPDATE cart SET quantity = quantity - 1 WHERE id = ?;', [id]);

          tx.executeSql('SELECT quantity FROM cart WHERE id = ?;', [id], (_, { rows }) => {
              if (rows.length > 0 && rows.item(0).quantity <= 0) {
                  tx.executeSql('DELETE FROM cart WHERE id = ?;', [id]);
                  console.log('Product removed from cart due to zero quantity', id);
              } else {
                  console.log('Quantity reduced by 1', rows.item(0).quantity);
              }
          });
      }); 
      } catch (error) {
        console.error('Error removing product from cart: ', error);
    }
};