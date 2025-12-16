---- TEST SQL SEED V2 ----
INSERT INTO
    "users" (id, balance)
VALUES
    (default, 100);

INSERT INTO
    "payment_history" (id, action, amount, status, user_id)
VALUES
    (default, 'deposit', 100, 'completed', 1);