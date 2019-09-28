CREATE TABLE entries (
    entry_id SERIAL PRIMARY KEY,
    entry_name VARCHAR(50),
    entry_category VARCHAR(50),
    is_asset BOOLEAN,
    amount INT
)