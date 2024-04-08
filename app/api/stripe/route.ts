import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';

// const settingsUrl = absoluteUrl('');

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if(!userId || !user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                // return_url: process.env.NEXT_PUBLIC_APP_URL
                return_url: 'http://localhost:3000/dashboard'
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/dashboard',
            cancel_url: 'http://localhost:3000',
            payment_method_types: ['card', 'boleto', 'paypal'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user!.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'BRL',
                        product_data: {
                            name: 'Formando Creators',
                            description: 'Curso de criação de conteúdo por Luide Matos',
                        },
                        unit_amount: 2490,
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        console.error('STRIPE_ERROR', error);
        return new NextResponse('Internal error', { status: 500 })
    }
}