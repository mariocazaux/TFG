-- Crear buckets públicos
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
insert into storage.buckets (id, name, public) values ('vehicles', 'vehicles', true);

-- Políticas RLS para Avatars
create policy "Public Access" on storage.objects for select using (bucket_id = 'avatars');
create policy "Auth Insert" on storage.objects for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');
create policy "Auth Update" on storage.objects for update with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Políticas RLS para Vehicles
create policy "Public Access Vehicles" on storage.objects for select using (bucket_id = 'vehicles');
create policy "Auth Insert Vehicles" on storage.objects for insert with check (bucket_id = 'vehicles' and auth.role() = 'authenticated');
create policy "Auth Update Vehicles" on storage.objects for update with check (bucket_id = 'vehicles' and auth.role() = 'authenticated');
