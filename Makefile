.PHONY: format test

format:
	deno fmt

test:
	deno test --unstable

rwildcard=$(foreach d,$(wildcard $(1:=/*)),$(call rwildcard,$d,$2) $(filter $(subst *,%,$2),$d))

build/factorial: $(call rwildcard,src,*.ts)
	deno run --unstable --allow-read --allow-write ./scripts/create-output-dir.ts
	deno compile --unstable --allow-net --allow-env -o build/factorial ./src/factorial.ts
