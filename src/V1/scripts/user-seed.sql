---- TEST SQL SEED ----

INSERT INTO
    "user" (id, balance)
VALUES
    (default, 100);

INSERT INTO
    "ledger" (id, action, amount, status, user_id)
VALUES
    (default, 'deposit', 100, 'completed', 1);