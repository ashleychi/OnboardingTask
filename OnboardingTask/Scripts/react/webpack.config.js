module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        Home:  "./app.js",
        Customer: "./customer.jsx",
        Product: "./product.jsx",
        Store: "./store.jsx",
        Sale: "./sale.jsx"
   
    }
    ,
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    }
    ,
    watch: true,
    resolve: {
        extensions: [".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_models)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }

        ]
    }
};

