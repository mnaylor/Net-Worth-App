DROP TABLE entries;

CREATE TABLE entries (
    entry_id SERIAL PRIMARY KEY,
    entry_name VARCHAR(50),
    entry_category VARCHAR(50),
    is_asset BOOLEAN,
    amount NUMERIC
);

INSERT INTO entries (entry_name, entry_category, is_asset, amount) VALUES
('Chequing', 'Cash and Investments', true, 45.328950320),
('Savings for Taxes', 'Cash and Investments', true, 2119.098952),
('Mortgage', 'Long Term Debt', false, 3293920.0031134),
('Predatory Loan', 'Short Term Debt', false, 4322);