-- Create vendor_type enum
CREATE TYPE public.vendor_type AS ENUM ('caterer', 'decorator', 'photographer', 'musician', 'florist', 'planner', 'other');

-- Create vendors table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type vendor_type NOT NULL,
  description TEXT,
  email TEXT,
  phone TEXT,
  price_range TEXT,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on vendors
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Vendors policies
CREATE POLICY "Anyone can view vendors" ON public.vendors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create vendors" ON public.vendors FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their vendors" ON public.vendors FOR UPDATE TO authenticated USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete their vendors" ON public.vendors FOR DELETE TO authenticated USING (auth.uid() = creator_id);

-- Create venues table
CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  price_per_hour DECIMAL(10,2),
  description TEXT,
  amenities TEXT[],
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on venues
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- Venues policies
CREATE POLICY "Anyone can view venues" ON public.venues FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create venues" ON public.venues FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Users can update their venues" ON public.venues FOR UPDATE TO authenticated USING (auth.uid() = creator_id);
CREATE POLICY "Users can delete their venues" ON public.venues FOR DELETE TO authenticated USING (auth.uid() = creator_id);

-- Create event_vendors junction table
CREATE TABLE public.event_vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, vendor_id)
);

-- Enable RLS on event_vendors
ALTER TABLE public.event_vendors ENABLE ROW LEVEL SECURITY;

-- Event vendors policies
CREATE POLICY "Anyone can view event vendors" ON public.event_vendors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Event creators can manage event vendors" ON public.event_vendors FOR INSERT TO authenticated 
  WITH CHECK (EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND creator_id = auth.uid()));
CREATE POLICY "Event creators can delete event vendors" ON public.event_vendors FOR DELETE TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND creator_id = auth.uid()));

-- Create event_venues junction table
CREATE TABLE public.event_venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  venue_id UUID NOT NULL REFERENCES public.venues(id) ON DELETE CASCADE,
  booking_start TIMESTAMP WITH TIME ZONE,
  booking_end TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, venue_id)
);

-- Enable RLS on event_venues
ALTER TABLE public.event_venues ENABLE ROW LEVEL SECURITY;

-- Event venues policies
CREATE POLICY "Anyone can view event venues" ON public.event_venues FOR SELECT TO authenticated USING (true);
CREATE POLICY "Event creators can manage event venues" ON public.event_venues FOR INSERT TO authenticated 
  WITH CHECK (EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND creator_id = auth.uid()));
CREATE POLICY "Event creators can delete event venues" ON public.event_venues FOR DELETE TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND creator_id = auth.uid()));

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view their notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their notifications" ON public.notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON public.venues FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.vendors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.venues;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;